import { NativeModules } from 'react-native';

const { LocationModule } = NativeModules;

const Location = {
  getCurrentLocation: () => {
    return new Promise((resolve, reject) => {
      LocationModule.getCurrentLocation((location:any) => {
        resolve(location);
      }, (error:any) => {
        reject(error);
      });
    });
  }
};
export default Location;