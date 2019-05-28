import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RecipeModule } from './app-recipe.module';
import { RouterModule } from '@angular/router';
import { RequestCacheService } from './services/request-cache.service';
import { CachingInterceptor } from './services/caching-Interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RecipeModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/ingredients', pathMatch: 'full'},
      { path: '**', redirectTo: '/ingredients' }
    ])
  ],
  exports: [RouterModule],
  providers: [
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
 