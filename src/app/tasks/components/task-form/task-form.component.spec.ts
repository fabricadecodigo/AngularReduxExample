import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TaskFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Given_IInsertAValueOnInput_When_GetTheValue_Then_ReturnTheCorrectValue', async () => {
    const taskTitle = 'Test';

    component.title = taskTitle;
    fixture.detectChanges();
    await fixture.whenStable();
    // get the input element
    const inputElement: HTMLInputElement = fixture
      .debugElement
      .nativeElement
      .querySelector('input');

    expect(inputElement.value).toBe(taskTitle);
  });

  it('Given_ClickOnButtonSave_When_CreateANewTask_Then_CreateTaskEventToBeCalled', async () => {
    const taskTitle = 'Test';
    spyOn(component.createTask, 'emit');

    component.title = taskTitle;
    fixture.detectChanges();
    await fixture.whenStable();

    component.onSubmit();

    expect(component.createTask.emit).toHaveBeenCalled();
  });
});
