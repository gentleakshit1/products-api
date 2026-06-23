# AI Pair Programming Logs - CodeVector Task
**Engineer:** Akshit Sharma
**Task:** High-Performance Product API & Frontend Implementation

*Note: The following is a summary transcript of the architectural discussions and pair-programming sessions used to design and build this system.*

---

**Akshit:** Let's architect the backend for the 200,000 product API. We need to handle pagination efficiently. Offset pagination is going to degrade in performance at deep pages and will skip/duplicate items if the database is actively changing. Let's go with Cursor Pagination. 

**AI:** I completely agree. For a dataset of this size, `OFFSET` and `LIMIT` will require the database to scan and discard rows, resulting in O(N) time complexity for deep pages. Cursor pagination will give us O(1) time complexity. We should use a composite cursor. What fields should we index?

**Akshit:** Let's create a composite index on `(-created_at, -id)`. This guarantees a deterministic sort order. If two products are created at the exact same millisecond, the UUID will act as a tie-breaker to prevent pagination collisions.

**AI:** Excellent choice. I'll scaffold the Django models with the `Index(fields=['-created_at', '-id'])`. Should we use Django REST Framework or Django Ninja?

**Akshit:** Let's use Django Ninja. It provides built-in Pydantic schema validation which is much faster than DRF serializers, and it auto-generates our OpenAPI documentation.

**AI:** Setting up Django Ninja now. For the data seeding script, we need to insert 200,000 records. Iterating and saving one by one will cause massive network I/O latency.

**Akshit:** Yes, we need to batch them. Let's append the generated objects to a list in memory and use Django's `bulk_create` with a batch size of 10,000. This translates to a single massive SQL `INSERT` statement per batch, reducing our database hits from 200,000 to just 20.

**AI:** Implementing the `seed_products` management command. I've set the batch size to 10k. 
*Update:* The script successfully inserted 200,000 records into the remote Neon PostgreSQL database in under 60 seconds.

**Akshit:** Great. Now for the frontend, I don't want a monolithic structure. Let's set up a proper Component-Based Architecture using Vite and React. We need `react-router-dom` for client-side routing, keeping the Product Feed and my About page strictly separated.

**AI:** I've extracted the UI into `Navbar.tsx`, `ProductCard.tsx`, and `ErrorState.tsx`. I've also implemented `framer-motion` for `whileInView` scroll animations on the grid. How do you want to handle API failure states?

**Akshit:** Wrap the API fetches in a try-catch. If the Render backend goes to sleep or throws a 500, we shouldn't show a blank screen. Catch the error, log the stack trace on the backend, and gracefully degrade the React UI by showing a localized error component with a retry mechanism.

**AI:** Implemented. The backend now uses Python's `logging` module to capture full stack traces, and `App.tsx` handles the failure by rendering the `ErrorState` component. The environment variables are configured to connect to the live Render deployment.

**Akshit:** Perfect. Everything looks production-ready. Let's push to GitHub and trigger the Vercel and Render deployment pipelines.
