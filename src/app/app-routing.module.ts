import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'informations',
    loadChildren: () => import('./informations/informations.module').then( m => m.InformationsPageModule),
    canActivate: [AuthGuard] },
  {
    path: 'sms-verification',
    loadChildren: () => import('./sms-verification/sms-verification.module').then( m => m.SmsVerificationPageModule)
  },
  {
    path: 'doctor-upload',
    loadChildren: () => import('./doctor-upload/doctor-upload.module').then( m => m.DoctorUploadPageModule)
  },
  {
    path: 'doctor-home-page',
    loadChildren: () => import('./doctor-home-page/doctor-home-page.module').then( m => m.DoctorHomePagePageModule)
  },
  {
    path: 'user-home-page',
    loadChildren: () => import('./user-home-page/user-home-page.module').then( m => m.UserHomePagePageModule)
  },
  {
    path: 'patient-edit-info',
    loadChildren: () => import('./patient-edit-info/patient-edit-info.module').then( m => m.PatientEditInfoPageModule)
  },
  {
    path: 'user-doctors-page',
    loadChildren: () => import('./user-doctors-page/user-doctors-page.module').then( m => m.UserDoctorsPagePageModule)
  },
  {
    path: 'user-nurses-page',
    loadChildren: () => import('./user-nurses-page/user-nurses-page.module').then( m => m.UserNursesPagePageModule)
  },
  {
    path: 'doctor-patients-page',
    loadChildren: () => import('./doctor-patients-page/doctor-patients-page.module').then( m => m.DoctorPatientsPagePageModule)
  },
  {
    path: 'doctor-prescriptions-page',
    loadChildren: () => import('./doctor-prescriptions-page/doctor-prescriptions-page.module').
    then( m => m.DoctorPrescriptionsPagePageModule)
  },
  {
    path: 'doctor-add-prescription',
    loadChildren: () => import('./doctor-add-prescription/doctor-add-prescription.module').then( m => m.DoctorAddPrescriptionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
