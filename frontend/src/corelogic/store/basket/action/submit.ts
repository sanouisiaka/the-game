export async function submit(): Promise<string> {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Promise resolved');
    }, 3000);
  });

}
