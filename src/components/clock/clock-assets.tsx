function DoubleDigit({ digit }: { digit: number }) {
  const paddedDigit = digit.toString().padStart(2, "0");

  return (
    <div className="text-[250px] font-bold">
      <div className="flex flex-col gap-1 items-center">

        {/* Top Half */}
        <div className="relative w-96 h-44 bg-white/10 backdrop-blur-2xl rounded-t-4xl overflow-hidden">
          <div className="absolute w-full h-89 top-0 flex justify-center items-center">
            {paddedDigit}
          </div>
        </div>

        {/* Bottom Half */}
        <div className="relative w-96 h-44 bg-white/10 backdrop-blur-2xl rounded-b-4xl overflow-hidden">
          <div className="absolute w-full h-89 bottom-0 flex justify-center items-center">
            {paddedDigit}
          </div>
        </div>

      </div>
    </div>
  );
}

function AMPMIndicator({ hours }: { hours: number }) {
  const ampm = hours < 12 ? "AM" : "PM";

  return (
    <div className="absolute top-4 left-5 text-3xl text-white/50 font-semibold text-trim">
      {ampm}
    </div>
  );
}

function SecondsDisplay({ seconds }: { seconds: number }) {
  return (
    <div className="absolute bottom-4 right-5 text-3xl text-white/50 font-semibold text-trim">
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

export { DoubleDigit, AMPMIndicator, SecondsDisplay };