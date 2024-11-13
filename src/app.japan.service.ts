import { Inject, Injectable } from "@nestjs/common";
//A service for handling business logic related to Japan (likely a country-specific feature).
@Injectable()
export class AppJapanService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject('MESSAGE')
    private readonly message: string
  ) { }

  getHello(): string {
    return `こんにちは世界! from ${this.name}, ${this.message}`;
  }
}