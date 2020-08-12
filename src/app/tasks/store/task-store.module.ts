import { TaskEffects } from './task.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { TaskStoreService } from './task-store.service';
import * as fromTasks from './task.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(fromTasks.tasksFeatureKey, fromTasks.reducer),
    EffectsModule.forFeature([TaskEffects])
  ],
  exports: [StoreModule],
  providers: [TaskStoreService]
})
export class TaskStoreModule { }
