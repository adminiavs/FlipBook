# Real3D Flipbook

A WordPress plugin for creating interactive 3D flipbooks.

## Development

### JavaScript Build Process

The plugin uses minified JavaScript files for production. To maintain code readability and ease of development:

1. **Source Files**: Readable source code is stored in `js/*.src.js` files
2. **Build Process**: Minified versions are generated using the build scripts
3. **Dependencies**: Install build tools with `npm install`

#### Building JavaScript

```bash
# Install dependencies
npm install

# Build all assets
npm run build

# Build only JavaScript
npm run build-js
```

#### File Structure

- `js/edit_flipbook_post.src.js` - Readable source for the admin editor
- `js/edit_flipbook_post.js` - Minified production version (auto-generated)

#### Development Workflow

1. Make changes to the `.src.js` files
2. Run `npm run build-js` to generate minified versions
3. Test the changes in WordPress
4. Commit both source and minified files

### Important Notes

- The current `edit_flipbook_post.js` is heavily minified and complex
- The `edit_flipbook_post.src.js` currently contains only a basic structure
- **TODO**: The full readable source code needs to be manually created from the minified version using a JavaScript beautifier/unminifier tool
- Always test thoroughly after rebuilding minified files
