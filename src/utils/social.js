import { first, last } from 'lodash';

export function formatSharedWith(persons) {
  if (persons.length === 0) return '';
  if (persons.length === 1) return 'Only Me';
  const otherCount = persons.length - 2;
  const showingPersons = persons.slice(0, 2);
  const lastPerson = showingPersons.length === 2 ? last(showingPersons) : null;
  const firstPerson = first(showingPersons);
  let sharedStr = firstPerson.name;
  if (lastPerson) {
    if (otherCount > 0) {
      sharedStr = sharedStr + `, ${lastPerson.name}, and ${otherCount} `;
      sharedStr = sharedStr + (otherCount > 1 ? 'Others' : 'Other');
    } else {
      sharedStr = sharedStr + ' and ' + lastPerson.name;
    }
  }
  return sharedStr;
}
