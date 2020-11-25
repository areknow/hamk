import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'map',
        loadChildren: () => import('./tabs/map/map.module').then(m => m.MapPageModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./tabs/list/list.module').then(m => m.ListPageModule)
      },
      {
        path: 'new',
        loadChildren: () => import('./tabs/new/new.module').then(m => m.NewPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/map',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
