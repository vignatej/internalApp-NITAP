const Answers = (props) => {
  const answers = props.answers;

  if (answers.length === 0) {
    return <div></div>;
  }
  return (
    <div className="mx-10">
      <h6 className="text-3xl font-black my-3">Answers</h6>
      {answers.map((ans) => {
        return (
          <div key={ans.id}>
            <div className="flex flex-row items-center mb-3">
              <img
                src={`http://127.0.0.1:8000${ans.user.profilePhoto}`}
                alt=".."
                className="w-8 h-8 rounded-full"
              />
              <div className="px-6">
                <div className="text-xl capitalize">
                  <p>{ans.user.name}</p>
                </div>
                <div>
                  <p className="text-sm">{ans.user.tagline}</p>
                </div>
              </div>
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>{ans.Text}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default Answers;
