import axios from 'axios';
import API from "@/services/api";

export interface AddressFeature {
  properties: {
    label: string;
    housenumber?: string;
    street?: string;
    postcode: string;
    city: string;
    citycode: string;
    context: string;
  };
  geometry: {
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface AddressResponse {
  features: AddressFeature[];
}

export interface AddressCreate {
  label: string;
  house_number?: string;
  street_name: string;
  postcode: string;
  city: string;
  citycode?: string;
  context?: string;
  longitude: number;
  latitude: number;
  additional_details?: string;
}

export interface Address extends AddressCreate {
  id: number;
  created_at: string;
}

const addressService = {

  async searchAddresses(query: string, options: {
    limit?: number;
    type?: string;
    postcode?: string;
    lat?: number;
    lon?: number;
  } = {}): Promise<AddressFeature[]> {
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append('q', query);
      
      // Add optional parameters
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.type) params.append('type', options.type);
      if (options.postcode) params.append('postcode', options.postcode);
      if (options.lat && options.lon) {
        params.append('lat', options.lat.toString());
        params.append('lon', options.lon.toString());
      }
      
      const response = await axios.get<AddressResponse>(
        `https://api-adresse.data.gouv.fr/search/?${params.toString()}`
      );
      
      return response.data.features;
    } catch (error) {
      console.error('Error searching addresses:', error);
      throw error;
    }
  },
  

  async createAddress(addressData: AddressCreate): Promise<Address> {
    const response = await API.put('/addresses', addressData);
    return response.data;
  },
  
  // Get address by ID
  async getAddressById(id: number): Promise<Address> {
    const response = await API.get(`/addresses/${id}`)
    return response.data;
  },
  
  // Convert from API feature to our format
  convertFeatureToAddressCreate(feature: AddressFeature): AddressCreate {
    return {
      label: feature.properties.label,
      house_number: feature.properties.housenumber,
      street_name: feature.properties.street || feature.properties.label.split(',')[0],
      postcode: feature.properties.postcode,
      city: feature.properties.city,
      citycode: feature.properties.citycode,
      context: feature.properties.context,
      longitude: feature.geometry.coordinates[0],
      latitude: feature.geometry.coordinates[1]
    };
  }
};

export default addressService;
