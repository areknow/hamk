import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
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
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
