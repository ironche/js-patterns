import { Ticket, TicketPrototype } from './prototype';

describe('Prototype', () => {
  it('should return object clone', () => {
    const ticket1 = new Ticket(10, '2020-02-02', 'Cinema');
    const ticket2 = new TicketPrototype(ticket1);
    expect(ticket1).not.toBe(ticket2);
    expect(ticket1).toEqual(ticket2);
    expect(ticket1.details()).toBe(ticket2.details());
    expect(ticket2 instanceof Ticket).toBe(true);
  });
});
