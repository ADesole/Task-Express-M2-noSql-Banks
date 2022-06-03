let accounts = require("../../accounts");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await accounts.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.accountDelete = (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await accounts.findById(accountId);
    if (foundAccount) {
      await foundAccount.remove();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await accounts.findById(accountId);
    if (foundAccount) {
      await foundAccount.findByIdAndUpdate(accountId, req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accountAll = await accounts.find();
    res.json(accountAll);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
