export const executeCommand = async (command: string) => {
  const result = await window.electronAPI.executeCommand(command);
  return result;
};
