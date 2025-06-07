import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, User, Mail, MapPin, CreditCard, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    country: '',
    city: '',
    phoneNumber: '',
    countryCode: '+91',
    aadharNo: '',
    panNo: ''
  });
  
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    country?: string;
    city?: string;
    phoneNumber?: string;
    aadharNo?: string;
    panNo?: string;
  }>({});
  const [submitted, setSubmitted] = useState(false);

  const countries = [
    { code: '+91', name: 'India', cities: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Patna'] },
    { code: '+1', name: 'United States', cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'] },
    { code: '+44', name: 'United Kingdom', cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds'] },
    { code: '+61', name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'] }
  ];

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.length < 2) {
          newErrors[name] = `${name === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'username':
        if (!value.trim()) {
          newErrors[name] = 'Username is required';
        } else if (value.length < 3) {
          newErrors[name] = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          newErrors[name] = 'Username can only contain letters, numbers, and underscores';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'email':
        if (!value.trim()) {
          newErrors[name] = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[name] = 'Please enter a valid email address';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors[name] = 'Password is required';
        } else if (value.length < 6) {
          newErrors[name] = 'Password must be at least 6 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors[name] = 'Password must contain uppercase, lowercase, and number';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'country':
        if (!value) {
          newErrors[name] = 'Please select a country';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'city':
        if (!value) {
          newErrors[name] = 'Please select a city';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'phoneNumber':
        if (!value.trim()) {
          newErrors[name] = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Please enter a valid 10-digit phone number';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'aadharNo':
        if (!value.trim()) {
          newErrors[name] = 'Aadhar number is required';
        } else if (!/^\d{12}$/.test(value.replace(/\s/g, ''))) {
          newErrors[name] = 'Aadhar number must be 12 digits';
        } else {
          delete newErrors[name];
        }
        break;
      
      case 'panNo':
        if (!value.trim()) {
          newErrors[name] = 'PAN number is required';
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase())) {
          newErrors[name] = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
        } else {
          delete newErrors[name];
        }
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'country') {
      const selectedCountry = countries.find(c => c.name === value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        countryCode: selectedCountry ? selectedCountry.code : '',
        city: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    validateField(name, value);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'username', 'email', 'password'].every(
          field => formData[field as keyof typeof formData] && !errors[field as keyof typeof errors]
        );
      case 2:
        return ['country', 'city', 'phoneNumber', 'aadharNo', 'panNo'].every(
          field => formData[field as keyof typeof formData] && !errors[field as keyof typeof errors]
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    const fieldsToValidate = currentStep === 1 
      ? ['firstName', 'lastName', 'username', 'email', 'password']
      : ['country', 'city', 'phoneNumber', 'aadharNo', 'panNo'];
    
    fieldsToValidate.forEach(field => validateField(field, formData[field as keyof typeof formData]));
    
    if (isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    const allFields = ['firstName', 'lastName', 'username', 'email', 'password', 'country', 'city', 'phoneNumber', 'aadharNo', 'panNo'];
    allFields.forEach(field => validateField(field, formData[field as keyof typeof formData]));
    
    if (allFields.every(field => formData[field as keyof typeof formData] && !errors[field as keyof typeof errors])) {
      setSubmitted(true);
    }
  };

  const selectedCountry = countries.find(c => c.name === formData.country);
  const availableCities = selectedCountry ? selectedCountry.cities : [];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-5xl w-full">
          {/* Header with Company Branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">CT</span>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-800">Celebal Technologies</h1>
                <p className="text-gray-500 text-sm">Registration Portal</p>
              </div>
            </div>
            
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your account has been created successfully with Celebal Technologies.</p>
          </div>
          
          {/* User Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-red-600" />
                Personal Details
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-800">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Username</p>
                  <p className="font-medium text-gray-800">@{formData.username}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Contact Info
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-800 text-sm break-all">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium text-gray-800">{formData.countryCode} {formData.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Location
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Country</p>
                  <p className="font-medium text-gray-800">{formData.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-medium text-gray-800">{formData.city}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-purple-600" />
                Identity
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Aadhar</p>
                  <p className="font-medium text-gray-800">{formData.aadharNo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">PAN</p>
                  <p className="font-medium text-gray-800">{formData.panNo.toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                setFormData({
                  firstName: '', lastName: '', username: '', email: '', password: '',
                  country: '', city: '', phoneNumber: '', countryCode: '+91', aadharNo: '', panNo: ''
                });
                setErrors({});
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Register Another Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-2xl w-full">
        {/* Header with Company Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">CT</span>
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-800">Celebal Technologies</h1>
              <p className="text-gray-500 text-sm">Create Your Account</p>
            </div>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                currentStep >= 1 ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
              }`}>
                1
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= 1 ? 'text-gray-800' : 'text-gray-500'
              }`}>
                Basic Details
              </span>
            </div>
            
            <div className={`flex-1 h-1 rounded-full transition-all duration-300 ${
              currentStep >= 2 ? 'bg-red-500' : 'bg-gray-300'
            }`}></div>
            
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                currentStep >= 2 ? 'bg-red-500 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= 2 ? 'text-gray-800' : 'text-gray-500'
              }`}>
                Contact & Identity
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.firstName 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.firstName}
                </p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.lastName 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.lastName}
                </p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a unique username"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  errors.username 
                    ? 'border-red-500 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 focus:border-red-500 focus:bg-white'
                }`}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>{errors.username}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 focus:border-red-500 focus:bg-white'
                }`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>{errors.email}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 ${
                    errors.password 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>{errors.password}
              </p>}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                disabled={!isStepValid(1)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                  isStepValid(1)
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue <ArrowRight className="ml-2" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact & Identity Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 appearance-none transition-all duration-200 ${
                      errors.country 
                        ? 'border-red-500 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-red-500 focus:bg-white'
                    }`}
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country.name} value={country.name}>{country.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
                {errors.country && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.country}
                </p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                <div className="relative">
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.country}
                    className={`w-full px-4 py-3 rounded-lg border-2 appearance-none transition-all duration-200 ${
                      errors.city 
                        ? 'border-red-500 bg-red-50 focus:border-red-500' 
                        : 'border-gray-200 focus:border-red-500 focus:bg-white'
                    } ${!formData.country ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                  >
                    <option value="">Select your city</option>
                    {availableCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                </div>
                {errors.city && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.city}
                </p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <div className="flex gap-3">
                <div className="flex items-center bg-gray-100 border-2 border-gray-200 rounded-lg px-4 py-3 min-w-[100px]">
                  <span className="text-gray-700 font-medium">{formData.countryCode}</span>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter 10-digit number"
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.phoneNumber 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
              </div>
              {errors.phoneNumber && <p className="text-red-500 text-sm mt-1 flex items-center">
                <span className="w-4 h-4 mr-1">⚠</span>{errors.phoneNumber}
              </p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                <input
                  type="text"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhar"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.aadharNo 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
                {errors.aadharNo && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.aadharNo}
                </p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                <input
                  type="text"
                  name="panNo"
                  value={formData.panNo}
                  onChange={handleInputChange}
                  placeholder="e.g., ABCDE1234F"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    errors.panNo 
                      ? 'border-red-500 bg-red-50 focus:border-red-500' 
                      : 'border-gray-200 focus:border-red-500 focus:bg-white'
                  }`}
                />
                {errors.panNo && <p className="text-red-500 text-sm mt-1 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>{errors.panNo}
                </p>}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all duration-200 flex items-center"
              >
                <ArrowLeft className="mr-2" size={16} /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!isStepValid(2)}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center ${
                  isStepValid(2)
                    ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Complete Registration <Check className="ml-2" size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
