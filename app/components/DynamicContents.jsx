import {Image} from '@shopify/hydrogen';
import {useState} from 'react';
import {RiArrowRightSLine, RiArrowLeftSLine} from 'react-icons/ri';
/** @import { Content } from '../data/contenues' */

/**
 * @param {{
 *  contents: Content[]
 * }}
 * @returns {import('typescript').JsxElement}
 */
export default function DynamicContents({contents = []}) {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  function previous() {
    setCurrentContentIndex(
      currentContentIndex <= 0 ? contents.length - 1 : currentContentIndex - 1,
    );
  }

  function next() {
    setCurrentContentIndex(
      currentContentIndex >= contents.length - 1 ? 0 : currentContentIndex + 1,
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center sm:justify-items-center bg-gray py-12 px-6 sm:py-3">
        <div>
          {contents.map((content, i) => (
            <div
              key={content.id}
              className={`grid gap-3 max-w-[600px] ${
                currentContentIndex !== i && 'hidden'
              }`}
            >
              <h1 className="text-6xl">{content.title.value}</h1>
              <span>{content.description.value}</span>
              <a
                href={content.linkUrl.value}
                className="rounded bg-primary p-3 text-white w-fit font-bold"
              >
                {content.linkLabel.value}
              </a>
            </div>
          ))}
          <div className="flex justify-end gap-3">
            <button
              onClick={previous}
              className="flex justify-center items-center w-[35px] h-[35px] bg-primary rounded-[80px] text-white"
            >
              <RiArrowLeftSLine size={25} />
            </button>
            <button
              onClick={next}
              className="flex justify-center items-center w-[35px] h-[35px] bg-primary rounded-[80px] text-white"
            >
              <RiArrowRightSLine size={25} />
            </button>
          </div>
        </div>

        <div className="hidden sm:block">
          <Image src="https://picsum.photos/id/239/750/350" width={750} />
        </div>
      </div>
    </div>
  );
}
