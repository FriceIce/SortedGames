import { MinimumSystemRequirements } from "../definitions";

const PC_browser_requirements = ({
  data,
}: {
  data: MinimumSystemRequirements | string[];
}) => {
  const { os, memory, storage, processor, graphics } =
    data as MinimumSystemRequirements;
  const browserRecuirements = data as string[];

  return (
    <>
      {os !== undefined ||
      memory !== undefined ||
      storage !== undefined ||
      processor !== undefined ||
      graphics !== undefined ? (
        <div className="space-y-3 text-xs">
          <div className="space-y-1">
            <h4 className="text-sm text-blue-300">OS</h4>
            <p className="">{os === null ? "No information" : os}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-blue-300">Memory</h4>
            <p className="">{memory === null ? "No information" : memory}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-blue-300">Storage</h4>
            <p className="">{storage === null ? "No information" : storage}</p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-blue-300">Processor</h4>
            <p className="">
              {processor === null ? "No information" : processor}
            </p>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-blue-300">Graphics</h4>
            <p className="">
              {graphics === null ? "No information" : graphics}
            </p>
          </div>
        </div>
      ) : (
        <article className="space-y-3 leading-[1.7]">
          {browserRecuirements.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </article>
      )}
    </>
  );
};

export default PC_browser_requirements;
