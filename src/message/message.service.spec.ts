import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { UserService } from '../user/user.service';
import { ConversationService } from '../conversation/conversation.service';
import { MessageProducer } from './queues/message.producer';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: ConversationService,
          useValue: {},
        },
        {
          provide: UserService,
          useValue: {},
        },
        {
          provide: MessageProducer,
          useValue: {
            produce: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
