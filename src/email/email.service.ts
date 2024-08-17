import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  async sendEmail(email: string) {
    console.log(`Dummy email sent to ${email}`);
  }
}
