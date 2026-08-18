export type Doctor = {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  role: string;
  experience: string;
  rating: number;
  reviews: number;
  consultationFee: string;
  insuranceCoverage: string;
  totalDue: string;
  location: string;
  address: string;
  distance: string;
  availability: string;
  nextSlot: string;
  appointmentType: string;
  networkStatus: string;
  careTags: string[];
  appointmentDays: { day: string; date: string; times: string[] }[];
  image: string;
  about: string;
  education: string;
  languages: string[];
  services: string[];
  waitTime: string;
};

export type SelectedSlot = {
  day: string;
  date: string;
  time: string;
};

export type RootStackParamList = {
  Login: undefined;
  Home: { patientName: string };
  DoctorDetails: { doctor: Doctor };
  AppointmentConfirmation: { doctor: Doctor; selectedSlot: SelectedSlot };
};
