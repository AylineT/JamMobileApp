import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { YStack } from 'tamagui';
import CustomInput from '@/components/atoms/CustomInput';
import { debounce } from 'lodash';
import * as Location from 'expo-location';
import addressService, { AddressFeature, Address } from '@/services/addressService';

interface AddressAutocompleteProps {
  onAddressSelected: (address: Address) => void;
  initialAddress?: string;
  placeholder?: string;
  limit?: number;
  filterType?: string;
  useCurrentLocation?: boolean;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelected,
  initialAddress = '',
  placeholder = 'Commencez à saisir une adresse...',
  limit = 5,
  filterType,
  useCurrentLocation = true,
}) => {
  const [query, setQuery] = useState(initialAddress);
  const [features, setFeatures] = useState<AddressFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  // Get current location if enabled
  useEffect(() => {
    if (useCurrentLocation) {
      (async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Location permission not granted');
            return;
          }
          
          const location = await Location.getCurrentPositionAsync({});
          setCurrentLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } catch (err) {
          console.error('Error getting location:', err);
        }
      })();
    }
  }, [useCurrentLocation]);

  // Debounced search function
  const searchAddresses = React.useCallback(
    debounce(async (text: string) => {
      if (!text || text.length < 2) {
        setFeatures([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const options = {
          limit,
          type: filterType,
          lat: currentLocation?.latitude,
          lon: currentLocation?.longitude
        };
        
        const features = await addressService.searchAddresses(text, options);
        setFeatures(features);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setError('Failed to fetch addresses. Please try again.');
        setFeatures([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [limit, filterType, currentLocation?.latitude, currentLocation?.longitude]
  );

  useEffect(() => {
    if (!selectedAddress) {
      searchAddresses(query);
    }
  }, [query, searchAddresses, selectedAddress]);

  const handleAddressSelect = async (feature: AddressFeature) => {
    try {
      setIsLoading(true);
      
      // Convert the feature to our backend format
      const addressData = addressService.convertFeatureToAddressCreate(feature);
      
      // Create the address in our backend
      const createdAddress = await addressService.createAddress(addressData);
      
      // Update state
      setSelectedAddress(createdAddress);
      setQuery(feature.properties.label);
      setShowResults(false);
      
      // Notify parent component
      onAddressSelected(createdAddress);
    } catch (err) {
      console.error('Error saving address:', err);
      setError('Failed to save address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <YStack width="100%" marginBottom="2%">
      <CustomInput
        label="Adresse"
        placeholder={placeholder}
        value={query}
        onChangeText={(value) => {
          setQuery(value);
          setSelectedAddress(null);
          setShowResults(true);
        }}
        onFocus={() => setShowResults(true)}
      />
      
      {showResults && !selectedAddress && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.resultsContainer}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#0000ff" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : features.length > 0 ? (
            <FlatList
              data={features}
              keyExtractor={(item, index) => `${item.properties.label}-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleAddressSelect(item)}
                >
                  <Text style={styles.resultText}>{item.properties.label}</Text>
                  <Text style={styles.resultSubtext}>{item.properties.context}</Text>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          ) : query.length > 2 ? (
            <Text style={styles.noResultsText}>Aucune adresse trouvée</Text>
          ) : null}
        </KeyboardAvoidingView>
      )}
      
      {selectedAddress && (
        <Text style={styles.selectedText}>
          ✓ Adresse validée: {selectedAddress.city} ({selectedAddress.postcode})
        </Text>
      )}
    </YStack>
  );
};

const styles = StyleSheet.create({
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 4,
    maxHeight: 200,
    width: '100%',
    zIndex: 1000,
  },
  list: {
    width: '100%',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 14,
    fontWeight: '500',
  },
  resultSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  selectedText: {
    marginTop: 5,
    fontSize: 14,
    color: '#2e7d32',
  },
  noResultsText: {
    padding: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  errorText: {
    padding: 12,
    color: 'red',
  },
  loader: {
    padding: 12,
  },
});

export default AddressAutocomplete;
