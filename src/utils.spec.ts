import assert from 'assert';
import { stripSubject } from './utils';

describe('stripSubject', () => {
  const expected = 'Helloworld!';

  it('should return same string', () => {
    assert.strictEqual(stripSubject('Helloworld!'), expected);
  });
  it('should remove space', () => {
    assert.strictEqual(stripSubject('Hello world!'), expected);
  });
  it('should remove multiple spaces', () => {
    assert.strictEqual(stripSubject('H e l l o    w o r l d!'), expected);
  });
  it('should remove text between square brackets and spaces', () => {
    assert.strictEqual(stripSubject('[PERSONAL] Hello world!'), expected);
  });
  it('should remove text before colon and spaces', () => {
    assert.strictEqual(stripSubject('PERSONAL: Hello world!'), expected);
  });
  it('should remove text and square brackets between square brackets and spaces', () => {
    assert.strictEqual(
      stripSubject('[MORE [COMPLEX] ] Hello world!'),
      expected
    );
  });
  it('should remove text and closing square bracket between square brackets and spaces', () => {
    assert.strictEqual(
      stripSubject('[What about wrong brackets] ] Hello world!'),
      expected
    );
  });
  it('should remove text and colon between square brackets and spaces', () => {
    assert.strictEqual(stripSubject('[ And : inside ] Hello world!'), expected);
  });
  it('should remove text, colon and square brackets before semicolon', () => {
    assert.strictEqual(
      stripSubject('[Inside : and ] outside : Hello world!'),
      expected
    );
  });
  it('should remove line break and spaces', () => {
    assert.strictEqual(stripSubject('  Hello\nworld!'), expected);
  });
  it('should remove closing square bracket, colons, and text before colon and text between square brackets and spaces', () => {
    assert.strictEqual(
      stripSubject(']:This:one:is:tricky: Hello [Invisible] world!'),
      expected
    );
  });
  it('should remove colon and opening square bracket between square brackets and space', () => {
    assert.strictEqual(stripSubject('Hello[:[] world!'), expected);
  });
});
