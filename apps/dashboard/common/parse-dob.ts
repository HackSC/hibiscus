export function parseDoB(dob: string): string {
  if (dob.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
    return dob;
  }

  const [year, month, day] = dob.split('T', 1)[0].split('-');
  return `${month}/${day}/${year}`;
}
