import { Test, TestingModule } from '@nestjs/testing';
import { ConversationModule } from './conversation.module';
import { ConversationResolver } from './conversation.resolver';


describe('ConversationResolver', () => {

  let resolver: ConversationResolver;


  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConversationModule],
      providers: [ConversationResolver],
    }).compile();

    resolver = module.get<ConversationResolver>(ConversationResolver);

  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
