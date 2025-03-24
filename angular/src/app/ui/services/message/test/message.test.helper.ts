export class MessageTestHelper {

  hasDisplaySuccessMessage(content: string){
    const messageDiv = document.querySelector('.ant-message');
    expect(messageDiv).toBeTruthy();

    const successIcon = document.querySelector('.anticon-check-circle');
    expect(successIcon).toBeTruthy();

    const messageContent = document.querySelector('.ant-message-custom-content') as HTMLDivElement;
    expect(messageContent.textContent!.length > 0).toBeTruthy();
    expect(messageContent.textContent).toContain(content);
  }

  isDisplayingFailMessage(content: string){
    const messageDiv = document.querySelector('.ant-message');
    expect(messageDiv).toBeTruthy();

    const failIcon = document.querySelector('.anticon-close-circle');
    expect(failIcon).toBeTruthy();

    const messageContent = document.querySelector('.ant-message-custom-content') as HTMLDivElement;
    expect(messageContent.textContent!.length > 0).toBeTruthy();
    expect(messageContent.textContent).toContain(content);
  }

}