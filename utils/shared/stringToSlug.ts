export const stringToSlug = (str: string) => {
    const isEnglish = /^[a-zA-Z0-9\s.,?!;:'"()\-_]+$/.test(str)
    if (!isEnglish) {
      return encodeURIComponent(str.replace(/ /g, '-'))
    }
    return str
      ?.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
  