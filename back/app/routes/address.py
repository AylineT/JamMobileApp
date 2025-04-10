from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from fastapi import status


from app.core.database import get_db
from app.core.security import get_current_user
from app.models.address import Address
from app.models.user import User
from app.schemas.address import AddressCreate, AddressResponse, AddressUpdate

router = APIRouter()

@router.put("/", response_model=AddressResponse, status_code=status.HTTP_201_CREATED)
def create_or_return_address(
    address_data: AddressCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Créer une nouvelle adresse ou retourner l'existante"""
    # Chercher si une adresse avec ce label existe déjà
    existing_address = db.query(Address).filter(Address.label == address_data.label).first()
    
    if existing_address:
        return existing_address  # 200 OK automatiquement
    
    # Sinon, créer une nouvelle adresse
    new_address = Address(**address_data.model_dump())
    db.add(new_address)
    db.commit()
    db.refresh(new_address)
    return new_address  # 201 Created car nouvelle ressource


@router.get("/{address_id}", response_model=AddressResponse)
def get_address(
    address_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer une adresse spécifique"""
    address = db.query(Address).filter(Address.id == address_id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    return address

@router.get("/", response_model=List[AddressResponse])
def get_addresses(
    skip: int = 0, 
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Récupérer toutes les adresses"""
    addresses = db.query(Address).offset(skip).limit(limit).all()
    return addresses

@router.patch("/{address_id}", response_model=AddressResponse)
def update_address(
    address_id: int,
    address_data: AddressUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mettre à jour une adresse"""
    db_address = db.query(Address).filter(Address.id == address_id).first()
    if not db_address:
        raise HTTPException(status_code=404, detail="Address not found")
    
    update_data = address_data.model_dump(exclude_unset=True)  # ← Clé ici
    for key, value in update_data.items():
        setattr(db_address, key, value)

    db.commit()
    db.refresh(db_address)
    return db_address

@router.delete("/{address_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_address(
    address_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Supprimer une adresse"""
    address = db.query(Address).filter(Address.id == address_id).first()
    if not address:
        raise HTTPException(status_code=404, detail="Address not found")
    
    if address.events:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete address as it is used by events"
        )
    
    db.delete(address)
    db.commit()
    return