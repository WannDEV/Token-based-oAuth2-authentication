const TestController = {
  async testFetch(req, res) {
    return res.status(200).json({ message: "Success" });
  },
};

export default TestController;
