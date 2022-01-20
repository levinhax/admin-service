// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { UserModule } from './user';

@Module({
  imports: [UserModule],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
