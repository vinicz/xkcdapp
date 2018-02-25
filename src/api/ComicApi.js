export class ComicApi {
  static async fetchComic(comicId) {
    const comicIdRequestParameter = comicId ? `${comicId}/` : '';
    const comicRequest = `https://xkcd.com/${comicIdRequestParameter}info.0.json`;
    try {
      const response = await fetch(comicRequest);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}
