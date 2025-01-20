import { NotespecialcharacterDirective } from './notespecialcharacter.directive';

describe('NotespecialcharacterDirective', () => {
  it('should create an instance', () => {
    const mockNgControl = jasmine.createSpyObj('NgControl', ['control']);
    const directive = new NotespecialcharacterDirective(mockNgControl);
    expect(directive).toBeTruthy();
  });
});
