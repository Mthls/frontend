let _people = [];

function _generateId() {
  return `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function validatePerson(person) {
  if (!person || typeof person !== 'object') return false;
  const { name, age } = person;
  return typeof name === 'string' && name.trim().length > 0 && Number.isFinite(age) && age >= 0;
}

export function createPerson({ name, age }) {
  const person = { id: _generateId(), name: String(name), age: Number(age) };
  if (!validatePerson(person)) throw new Error('Pessoa inválida');
  _people.push(person);
  return person;
}

export function getPeople() {
  return [..._people];
}

export function getPersonById(id) {
  return _people.find(p => p.id === id) || null;
}

export function updatePerson(id, data) {
  const idx = _people.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const updated = { ..._people[idx], ...data };
  if (!validatePerson(updated)) throw new Error('Atualização inválida');
  _people[idx] = updated;
  return updated;
}

export function removePerson(id) {
  const idx = _people.findIndex(p => p.id === id);
  if (idx === -1) return false;
  _people.splice(idx, 1);
  return true;
}

export function clearAll() {
  _people = [];
}

export default {
  validatePerson,
  createPerson,
  getPeople,
  getPersonById,
  updatePerson,
  removePerson,
  clearAll,
};
