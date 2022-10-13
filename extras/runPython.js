const { spawn } = require("child_process");
const runPython = async function (id, whom, what) {
  await new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["fr_final.py", id, whom, what]);

    pythonProcess.stdout.on("data", (data) => {
      const resp = data.toString();
      console.log(resp);
      return resp;
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject();
    });

    pythonProcess.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
    });
    pythonProcess.on("exit", resolve);
  });
};

module.exports = { runPython };
