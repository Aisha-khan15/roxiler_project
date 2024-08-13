import { Transaction } from "../models/transaction.model.js";

export const getPieChartData = async (req, res) => {
  const { month } = req.query;

  try {
    const pieChartData = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(
              new Date(month).setMonth(new Date(month).getMonth() + 1)
            ),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const formattedChartData = pieChartData.map((entry) => ({
      category: entry._id,
      itemCount: entry.count,
    }));

    res.status(200).json(formattedChartData);
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    res.status(500).json({ error: "Failed to fetch pie chart data." });
  }
};

export const getBarChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month parameter is required." });
  }

  const startOfMonth = new Date(month);
  if (isNaN(startOfMonth.getTime())) {
    return res.status(400).json({ error: "Invalid month format." });
  }

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);

  try {
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    const priceRangeData = await Promise.all(
      priceRanges.map(async (range) => {
        const count = await Transaction.countDocuments({
          price: { $gte: range.min, $lte: range.max },
          dateOfSale: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        });
        return { range: `${range.min}-${range.max}`, count };
      })
    );

    res.status(200).json(priceRangeData);
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    res.status(500).json({ error: "Failed to fetch bar chart data." });
  }
};

export const statisticsData = async (req, res) => {
  const { month } = req.query;

  try {
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: new Date(month),
            $lt: new Date(
              new Date(month).setMonth(new Date(month).getMonth() + 1)
            ),
          },
          sold: true,
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
        },
      },
    ]);

    const totalSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: new Date(month),
        $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
      },
      sold: true,
    });

    const totalNotSoldItems = await Transaction.countDocuments({
      dateOfSale: {
        $gte: new Date(month),
        $lt: new Date(new Date(month).setMonth(new Date(month).getMonth() + 1)),
      },
      sold: false,
    });

    res.status(200).json({
      totalSaleAmount:
        totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error("Error calculating statistics:", error);
    res.status(500).json({ error: "Failed to calculate statistics." });
  }
};

export const transactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  const skip = (page - 1) * perPage;
  const limit = parseInt(perPage);

  if (!month) {
    return res.status(400).json({ error: "Month parameter is required." });
  }

  const startOfMonth = new Date(month);
  if (isNaN(startOfMonth.getTime())) {
    return res.status(400).json({ error: "Invalid month format." });
  }

  const endOfMonth = new Date(startOfMonth);
  endOfMonth.setMonth(startOfMonth.getMonth() + 1);

  try {
    let filter = {
      dateOfSale: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    };

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        // { price: { $eq: parseFloat(search) } },
      ];
    }

    const totalCount = await Transaction.countDocuments(filter);

    const transactions = await Transaction.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ dateOfSale: -1 });

    res.status(200).json({
      totalCount,
      page,
      perPage,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};
