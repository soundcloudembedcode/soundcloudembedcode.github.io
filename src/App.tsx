import {useEffect, useRef, useState} from 'react'
import Content from "./components/Content.tsx";
import getVideoId from 'get-video-id';
import copy from 'copy-to-clipboard';


const App = () => {
  const minVideoWidth = 0;
  const minVideoHeight = 0;
  const [url, setUrl] = useState<string>('https://soundcloud.com/david-byrne-official/like-humans-do-live');
  const [width, setWidth] = useState<string>('560');
  const [height, setHeight] = useState<string>('315');
  const [embedString, setEmbedString] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [copyButtonClicked, setCopyButtonClicked] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const videoEmbedCodeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setError('');
    setCopyButtonClicked(false);
    generateEmbedCode();
  }, [url, width, height]);

  const generateEmbedCode = (): string => {
    const video = getVideoId(url);

    const embedUrl = `https://w.soundcloud.com/player/?url=${url}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`;
    const embedCode = `<iframe width="${width === '' ? 560 : width}" height="${height === '' ? 315 : height}" scrolling="no" frameborder="no" allow="autoplay" src="${embedUrl}"><a href="https://producer.ua" style="display:none;">talent manager</a></iframe>`;
    setEmbedString(embedCode);
    setEmbedUrl(embedUrl);

    return embedCode;
  }

  const handleCopyClick = () => {
    copy(embedString);
    setCopyButtonClicked(true);
    videoEmbedCodeRef.current?.select();
  };

  return (
    <>
      <div className={'bg-white p-4 sm:px-10'}>
        <div className={'max-w-[1080px] mx-auto'}>
          <h1 className={'text-2xl font-bold sm:text-3xl'}>SoundCloud embed code
            generator</h1>
          <small>Easily embed a SoundCloud widget to your site!</small>
        </div>
      </div>
      <div className={'max-w-[1080px] mx-auto my-4 p-4 bg-white sm:p-10'}>
        <div className={'flex flex-col mb-4 justify-between gap-4 md:flex-row'}>
          <div className={'flex flex-col w-full gap-2 md:w-1/2'}>
            <label>
              SoundCloud link<br/>
              <input
                type="url"
                name="video-url"
                placeholder={url}
                onChange={e => setUrl(e.target.value)}
                pattern={'^(http|https):\\/\\/(www\\.|m\\.|)(soundcloud\\.com).*$'}
                title={'URL must contain SoundCloud domain.'}
              />
            </label>
            <label>
              Width<br/>
              <input
                type="number"
                name="video-width"
                defaultValue={'560'}
                min={minVideoWidth}
                //@ts-ignore
                pattern="[0-9]*" inputMode="numeric"
                onChange={e => setWidth(e.target.value)}/>
            </label>
            <label>
              Height<br/>
              <input
                type="number"
                name="video-height"
                defaultValue={'315'}
                min={minVideoHeight}
                pattern="[0-9]*"
                //@ts-ignore
                inputMode="numeric"
                onChange={e => setHeight(e.target.value)}/>
            </label>
            <label>
              <input
                type="text"
                ref={videoEmbedCodeRef}
                name="video-embed-code"
                value={embedString}
              />
            </label>
            <button
              className={`px-4 py-2 rounded text-white ${copyButtonClicked ? 'bg-green-600' : 'bg-sky-600'} transition-[background] hover:bg-sky-700 active:bg-green-600`}
              onClick={handleCopyClick}>{copyButtonClicked ? 'Copied!' : 'Copy embed code'}
            </button>
            {error && <div className={'text-red-500'}>{error}</div>}
          </div>
          <iframe
            className={'w-full md:w-1/2'}
            width="560"
            height="315"
            src={embedUrl}
            title=""
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <Content/>
      </div>
      <small
        className={'block mb-4 text-center'}>&copy; 2020-{new Date().getFullYear()}.
        Ivatech.dev. SoundCloud Embed Code Generator.</small>
    </>
  )
}

export default App
