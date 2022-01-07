import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
const routes: Routes = [
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
  {
    path: 'nurse-home-page',
    loadChildren: () => import('./nurse-home-page/nurse-home-page.module').then( m => m.NurseHomePagePageModule)
  },
  {
    path: 'nurse-patients-page',
    loadChildren: () => import('./nurse-patients-page/nurse-patients-page.module').then( m => m.NursePatientsPagePageModule)
  },
  {
    path: 'nurse-add-prescription-page',
    loadChildren: () => import('./nurse-add-prescription-page/nurse-add-prescription-page.module').
    then( m => m.NurseAddPrescriptionPagePageModule)
  },
  {
    path: 'nurse-upload-page',
    loadChildren: () => import('./nurse-upload-page/nurse-upload-page.module').then( m => m.NurseUploadPagePageModule)
  },
  {
    path: 'nurse-prescription-page',
    loadChildren: () => import('./nurse-prescription-page/nurse-prescription-page.module').then( m => m.NursePrescriptionPagePageModule)
  },
  {
    path: 'user-prescriptions-page',
    loadChildren: () => import('./user-prescriptions-page/user-prescriptions-page.module').then( m => m.UserPrescriptionsPagePageModule)
  },
  {
    path: 'user-doctors-all-doctors',
    loadChildren: () => import('./user-doctors-all-doctors/user-doctors-all-doctors.module').then( m => m.UserDoctorsAllDoctorsPageModule)
  },
  {
    path: 'user-doctors-my-doctors',
    loadChildren: () => import('./user-doctors-my-doctors/user-doctors-my-doctors.module').then( m => m.UserDoctorsMyDoctorsPageModule)
  },
  {
    path: 'user-drugstores-page',
    loadChildren: () => import('./user-drugstores-page/user-drugstores-page.module').then( m => m.UserDrugstoresPagePageModule)
  },
  {
    path: 'drugstore-home-page',
    loadChildren: () => import('./drugstore-home-page/drugstore-home-page.module').then( m => m.DrugstoreHomePagePageModule)
  },
  {
    path: 'drugstore-edit-info',
    loadChildren: () => import('./drugstore-edit-info/drugstore-edit-info.module').then( m => m.DrugstoreEditInfoPageModule)
  },
  {
    path: 'drugstore-prescriptions-page',
    loadChildren: () => import('./drugstore-prescriptions-page/drugstore-prescriptions-page.module').
    then( m => m.DrugstorePrescriptionsPagePageModule)
  },
  {
    path: 'drugstore-drugs-page',
    loadChildren: () => import('./drugstore-drugs-page/drugstore-drugs-page.module').then( m => m.DrugstoreDrugsPagePageModule)
  },
  {
    path: 'drugstore-edit-info',
    loadChildren: () => import('./drugstore-edit-info/drugstore-edit-info.module').then( m => m.DrugstoreEditInfoPageModule)
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'admin-nurses',
    loadChildren: () => import('./admin-nurses/admin-nurses.module').then( m => m.AdminNursesPageModule)
  },
  {
    path: 'admin-doctors',
    loadChildren: () => import('./admin-doctors/admin-doctors.module').then( m => m.AdminDoctorsPageModule)
  },
  {
    path: 'admin-drugstores',
    loadChildren: () => import('./admin-drugstores/admin-drugstores.module').then( m => m.AdminDrugstoresPageModule)
  },
  {
    path: 'admin-see-info',
    loadChildren: () => import('./admin-see-info/admin-see-info.module').then( m => m.AdminSeeInfoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
