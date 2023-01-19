import { NgModule } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CustomPreloadService } from "./services/custom-preload.service";

import { QuicklinkStrategy } from "ngx-quicklink";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then( m => m.WebsiteModule ),
    data: {
      preload: true,
    }
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then( m => m.CmsModule )
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: QuicklinkStrategy
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
