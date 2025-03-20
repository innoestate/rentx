
export const expectThatMessageIsDisplayed = (message: string) => {
  expect(document.body.querySelector('.ant-message')).toBeTruthy();
  const messageContainer = document.body.querySelector('.ant-message-custom-content') as HTMLDivElement;
  expect(messageContainer).toBeTruthy();
  expect(messageContainer.textContent).toEqual(message);
}