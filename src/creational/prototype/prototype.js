export function Ticket(price, date, description) {
  this.details = () => `${price} ${date} ${description}`;
}

export function TicketPrototype(ticket) {
  const clone = Object.create(ticket);
  return Object.assign(clone, ticket);
}
