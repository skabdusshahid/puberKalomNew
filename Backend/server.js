const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// MongoDB connection
const DB = 'mongodb+srv://abdusshahid11399:3QppeRMJJ15VCkwE@cluster0.w3xas7k.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=Cluster0';
//const DB = 'mongodb://localhost:27017/ttst'; 
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connection successful'))
  .catch(err => console.error('MongoDB connection error:', err.message));

// Define Mongoose schemas and models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Reporter Profile and login Schema
const reporterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  bloodgroup: { type: String, required: true },
  dob: { type: Date, required: true },
  photo: { type: String, required: true },
  highestqualification: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
},
  { timestamps: true });

const Reporter = mongoose.model('Reporter', reporterSchema);

const pageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Page = mongoose.model('Page', pageSchema);


const menubarSchema = new mongoose.Schema({
  itemName: { type: String, required: true },  // Store the name of the menu item
});

const Menubar = mongoose.model('Menubar', menubarSchema);

const adminDashboardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, ref: 'Category' },
  content: { type: String, required: true },
  picture: { type: String },
  tags: { type: [String], required: true },
  isBreaking: { type: Boolean, default: false },
  date: { type: Date },
  reporterName: { type: String, required: true },
  location: { type: String },
  metaTitle: { type: String }, // New field
  metaDescription: { type: String } // New field
});


const AdminDashboard = mongoose.model('AdminDashboard', adminDashboardSchema);

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Category = mongoose.model('Category', categorySchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.post('/master-login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error checking credentials:', error.message);
    res.status(500).json({ message: 'Error checking credentials', error: error.message });
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const reporter = await Reporter.findOne({ username });
    if (reporter && reporter.password === password) {
      res.status(200).json({
        message: 'Login successful',
        reporterId: reporter._id.toString(), // Ensure it's a string
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error checking credentials:', error.message);
    res.status(500).json({ message: 'Error checking credentials', error: error.message });
  }
});



// Updated /admin-dashboard route to handle duplicates
app.post('/admin-dashboard', async (req, res) => {
  try {
    const items = req.body;
    const messages = [];

    for (const item of items) {
      const exists = await AdminDashboard.findOne({ title: item.title }); // Check for duplicates based on title

      if (exists) {
        messages.push(`Duplicate item detected for title: ${item.title}. Skipped.`);
        continue; // Skip this item
      }

      const newItem = new AdminDashboard({
        title: item.title,
        category: item.category,
        content: item.content,
        picture: item.picture,
        tags: item.tags,
        isBreaking: item.isBreaking,
        date: item.date,
        reporterName: item.reporterName,
        location: item.location,
        metaTitle: item.metaTitle,        // Include Meta Title
        metaDescription: item.metaDescription,
      });

      await newItem.save();
      messages.push(`Item added: ${item.title}`);
    }

    res.status(200).json({ message: 'Data processed successfully', details: messages });
  } catch (error) {
    //console.error('Error submitting data:', error.message);
    res.status(500).json({ message: 'Error submitting data', error: error.message });
  }
});

app.post('/admindashboard-new', upload.single('picture'), async (req, res) => {
  const { title, category, content, tags, isBreaking, reporterName, location, metaTitle, metaDescription } = req.body;
  const picture = req.file ? `\\uploads\\${req.file.filename}` : null;

  try {
    const newForm = new AdminDashboard({
      title,
      category,
      content,
      picture,
      tags: JSON.parse(tags),
      isBreaking: isBreaking === 'true',
      reporterName,
      date: Date(),
      location,
      metaTitle,        // Include Meta Title
      metaDescription,  // Include Meta Description
    });

    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error.message);
    res.status(500).json({ message: 'Error submitting form', error: error.message });
  }
});

app.get('/admin-dashboard', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const dateFilter = req.query.date;
    const categoryFilter = req.query.category;

    const query = {};

    if (dateFilter) {
      const startOfDay = new Date(dateFilter);
      const endOfDay = new Date(dateFilter);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = { $gte: startOfDay, $lte: endOfDay };
    }

    if (categoryFilter) {
      query.category = categoryFilter;
    }

    const totalDocuments = await AdminDashboard.countDocuments(query);
    const forms = await AdminDashboard.find(query)
      .sort({ date: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalPages = Math.ceil(totalDocuments / limit);

    res.status(200).json({
      forms,
      totalPages,
      currentPage: page,
      totalDocuments,
    });
  } catch (error) {
    console.error('Error fetching forms:', error.message);
    res.status(500).json({ message: 'Error fetching forms', error: error.message });
  }
});

app.get('/admin-dashboard/:id', async (req, res) => {
  try {
    const newsItem = await AdminDashboard.findById(req.params.id).exec();
    if (!newsItem) {
      return res.status(404).send('News item not found');
    }
    res.json(newsItem);
  } catch (error) {
    console.error('Error fetching news detail:', error);
    res.status(500).send('Server error');
  }
});

app.put('/admin-dashboard/:id', upload.single('picture'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, tags, isBreaking, reporterName, location, metaTitle, metaDescription } = req.body;
    const picture = req.file ? `\\uploads\\${req.file.filename}` : req.body.picture;

    const updateData = {
      title,
      category,
      content,
      picture,
      tags: Array.isArray(tags) ? tags : JSON.parse(tags),
      isBreaking,
      reporterName,
      location,
      metaTitle,        // Update Meta Title
      metaDescription,  // Update Meta Description
    };

    const updatedForm = await AdminDashboard.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error.message);
    res.status(500).json({ message: 'Error updating form', error: error.message });
  }
});

app.delete('/admin-dashboard/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await AdminDashboard.findByIdAndDelete(id);
    res.status(200).json({ message: 'Form deleted successfully' });
  } catch (error) {
    console.error('Error deleting form:', error.message);
    res.status(500).json({ message: 'Error deleting form', error: error.message });
  }
});


// Create a new category with subcategories
app.post('/categories', async (req, res) => {
  const { name } = req.body;

  try {
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error.message);
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
});

// Fetch a single category by ID
app.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Error fetching category:', error.message);
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});


// Fetch all categories with subcategories
app.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    res.status(500).json({ message: 'Error fetching categories', error: error.message });
  }
});

// Route to fetch posts by category name
app.get('/posts/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    // Find category by name
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Fetch posts by category ID
    const posts = await Post.find({ category: category._id }).populate('category');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts by category:', error.message);
    res.status(500).json({ message: 'Error fetching posts by category', error: error.message });
  }
});


// Update a category or subcategory
app.put('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (error) {
    console.error('Error updating category:', error.message);
    res.status(500).json({ message: 'Error updating category', error: error.message });
  }
});

// Delete a category
app.delete('/categories/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error.message);
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});



// POST: Create a new reporter
app.post('/reporters', upload.single('photo'), async (req, res) => {

  try {
    const reporterData = {
      ...req.body,
      photo: req.file ? `\\uploads\\${req.file.filename}` : req.body.picture // Save the file path
    };
    const reporter = new Reporter(reporterData);
    await reporter.save();
    res.status(201).json({ message: 'Form submitted successfully' });;
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// GET: Get all reporters
app.get('/reporters', async (req, res) => {
  try {
    const reporters = await Reporter.find();
    res.status(200).send(reporters);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET: Get a specific reporter by ID
app.get('/reporters/:id', async (req, res) => {
  try {
    const reporter = await Reporter.findById(req.params.id);
    if (!reporter) {
      return res.status(404).send({ error: 'Reporter not found' });
    }
    res.status(200).send(reporter);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// PUT: Update a reporter by ID
app.put('/reporters/:id', upload.single('photo'), async (req, res) => {
  try {
    const reporterData = {
      ...req.body,
      photo: req.file ? req.file.path : req.body.photo // Use new file path if uploaded
    };
    const reporter = await Reporter.findByIdAndUpdate(req.params.id, reporterData, { new: true, runValidators: true });
    if (!reporter) {
      return res.status(404).send({ error: 'Reporter not found' });
    }
    res.status(200).send(reporter);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// DELETE: Delete a reporter by ID
app.delete('/reporters/:id', async (req, res) => {
  try {
    const reporter = await Reporter.findByIdAndDelete(req.params.id);
    if (!reporter) {
      return res.status(404).send({ error: 'Reporter not found' });
    }
    res.status(200).send({ message: 'Reporter deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});



// Create a new page
app.post('/pages', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newPage = new Page({ name, description });
    await newPage.save();
    res.status(201).json({ message: 'Page created successfully' });
  } catch (error) {
    console.error('Error creating page:', error.message);
    res.status(500).json({ message: 'Error creating page', error: error.message });
  }
});
// Get all pages
app.get('/pages', async (req, res) => {
  try {
    const pages = await Page.find();
    res.status(200).json(pages);
  } catch (error) {
    console.error('Error fetching pages:', error.message);
    res.status(500).json({ message: 'Error fetching pages', error: error.message });
  }
});

// Get a page by slug
app.get('/pages/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    // Convert slug back to a regular expression to search for the page name
    const regex = new RegExp(`^${slug.replace(/-/g, '\\s+')}$`, 'i');
    const page = await Page.findOne({ name: { $regex: regex } });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    res.status(200).json(page);
  } catch (error) {
    console.error('Error fetching page:', error.message);
    res.status(500).json({ message: 'Error fetching page', error: error.message });
  }
});





// Update a page
app.put('/pages/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedPage = await Page.findByIdAndUpdate(id, { name, description }, { new: true });
    res.status(200).json({ message: 'Page updated successfully', page: updatedPage });
  } catch (error) {
    console.error('Error updating page:', error.message);
    res.status(500).json({ message: 'Error updating page', error: error.message });
  }
});

// Delete a page
app.delete('/pages/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Page.findByIdAndDelete(id);
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error deleting page:', error.message);
    res.status(500).json({ message: 'Error deleting page', error: error.message });
  }
});



// GET /menubar - Retrieve all menu items
app.get('/menubar', async (req, res) => {
  try {
    const menuItems = await Menubar.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /menubar - Add a new menu item
app.post('/menubar', async (req, res) => {
  try {
    const newItem = new Menubar({ itemName: req.body.itemName });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// PUT /menubar/:id - Update an existing menu item
app.put('/menubar/:id', async (req, res) => {
  try {
    const updatedItem = await Menubar.findByIdAndUpdate(
      req.params.id,
      { itemName: req.body.itemName },
      { new: true, runValidators: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// DELETE /menubar/:id - Delete a menu item
app.delete('/menubar/:id', async (req, res) => {
  try {
    const deletedItem = await Menubar.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /menubar/:id - Retrieve a menu item by ID
app.get('/menubar/:id', async (req, res) => {
  try {
    const menuItem = await Menubar.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});