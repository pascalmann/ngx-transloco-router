﻿import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreetingsComponent } from './greetings/greetings.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {
  LOCALIZE_ROUTER_CONFIG,
  localizeRouterConfig,
} from '../../../../libs/ngx-transloco-router/src/lib/localize-router.config';
import { LocalizeRouterModule } from '@penleychan/ngx-transloco-router';

const routes: Routes = [
  {
    path: 'greetings',
    component: GreetingsComponent,
    data: {
      skipRouteLocalization: false,
    },
  },
  {
    path: 'child',
    loadChildren: () =>
      import('./feature/feature.module').then((mod) => mod.FeatureModule),
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./core/core.module').then((mod) => mod.CoreModule),
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LocalizeRouterModule.forRoot(routes)],
  exports: [RouterModule, LocalizeRouterModule],
  providers: [
    {
      provide: LOCALIZE_ROUTER_CONFIG,
      useValue: localizeRouterConfig({
        translateRoute: true,
        alwaysSetPrefix: false,
      }),
    },
  ],
})
export class AppRoutingModule {}
