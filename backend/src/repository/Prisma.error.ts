export class PrismaError {
  private readonly error;

  constructor(prismaError) {
    this.error = prismaError;
  }
}
