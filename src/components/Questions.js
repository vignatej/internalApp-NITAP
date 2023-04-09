import AddAnswer from "./AddAnswer";
import Answers from "./Answers";

const Questions = (props) => {
  const questions = props.questions;
  if (questions.length === 0) {
    return <></>;
  }
  return (
    <>
      <h3 className="text-3xl font-black my-3">Questions</h3>
      {questions.map((ques) => {
        return (
          <div key={ques.id}>
            <div className="bg-cardCol rounded-xl p-3 mb-5">
              <div className="flex flex-row items-center">
                <img
                  src={`http://127.0.0.1:8000${ques.user.profilePhoto}`}
                  alt=".."
                  className="w-12 h-12 rounded-full"
                />
                <div className="px-6">
                  <div className="text-2xl capitalize">
                    <p>{ques.user.name}</p>
                  </div>
                  <div>
                    <p>{ques.user.tagline}</p>
                  </div>
                </div>
              </div>
              <h5 className="font-semibold mt-5" style={{ whiteSpace: "pre-wrap" }}>
                {ques.Text}
              </h5>
              <Answers answers={ques.answers}/>
              <AddAnswer id={ques.id}/>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default Questions;
