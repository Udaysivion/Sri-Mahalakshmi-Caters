/**
 * Interface definition for Reservation Repository (DDD Port)
 */
export class IReservationRepository {
  async create(reservation) {
    throw new Error('Method not implemented.');
  }

  async findById(id) {
    throw new Error('Method not implemented.');
  }

  async findAll(filters) {
    throw new Error('Method not implemented.');
  }

  async updateStatus(id, newStatus) {
    throw new Error('Method not implemented.');
  }
}
