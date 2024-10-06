# Appsmith Dashboards

This project contains Appsmith dashboards that you can run locally using Docker. Appsmith is a low-code platform that enables you to quickly build internal tools and dashboards.

## Getting Started

This section will guide you through setting up and running the project on your local machine.

### Prerequisites

Before you begin, ensure that you have the following installed:

1. **Docker**: Docker is required to run Appsmith in a containerized environment. If you don't have Docker installed, follow the official [Docker installation guide](https://docs.docker.com/get-docker/) for your operating system.

   - Windows users might need Docker Desktop.
   - Linux and macOS users can install Docker Engine directly.

2. **Git**: You'll need Git to clone the repository. Install Git from the [official website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) if you haven't done so already.

### Running the Project

Once you have the prerequisites set up, follow these steps to run the Appsmith dashboard locally:

#### 1. Clone the Repository

The first step is to clone the project repository to your local machine. Open a terminal (or command prompt) and run the following commands:

```bash
# Clone the repository
git clone https://github.com/Builder-s-League/BuildersLeague-Edition1

# Navigate into the the main project
cd BuildersLeague-Edition1

# Navigate into the project folder
cd appsmith_dashboards
```

#### 2. Start Appsmith with Docker Compose

Docker Compose will help you start the entire Appsmith environment with a single command. Here's how to do it:

```bash
docker compose up -d
```

- The `-d` flag runs Docker Compose in detached mode, meaning it will run the containers in the background.
- Appsmith and its dependencies (like databases or services) will automatically be pulled and started within Docker containers.

#### 3. Access the Appsmith Dashboard

Once the containers are up and running, open your web browser and go to:

```plaintext
http://localhost:8080
```

This will load the Appsmith web interface on your local machine.

#### 4. Create an Account

If this is your first time using Appsmith, you'll need to create a new account:

1. On the login screen, click the "Sign Up" button.
2. Fill in your details (email, password) and click "Sign Up."
3. After signing up, you will be logged into your Appsmith dashboard.

#### 5. Import the Dashboard JSON

To configure your dashboard, you'll need to import the provided JSON file:

1. Inside the Appsmith dashboard, click on the "Manage" icon in the top right corner.
2. Select **Import** from the dropdown menu.
3. Upload the JSON file located in the `appsmith_dashboards/` directory of this project:

   ```plaintext
   appsmith_dashboards/<dashboard_name>.json
   ```

4. After the import, the dashboard will be loaded and you can begin exploring or modifying it.

---

### Contributing

If you'd like to contribute changes to the dashboards or create your own, follow these steps:

#### 1. Make Your Changes

You can modify the dashboard within Appsmith by adding or updating widgets, data sources, or layouts.

#### 2. Export the Updated JSON

Once you've made your changes, export the updated dashboard configuration to a JSON file:

1. Inside Appsmith, click the "Manage" icon again.
2. Select **Export** from the dropdown.
3. Save the exported JSON file to the `appsmith_dashboards/` directory, replacing the old file.

#### 3. Commit Your Changes

To save and share your changes, commit the updated JSON file:

```bash
# Stage the changes
git add appsmith_dashboards/<dashboard_name>.json

# Commit with a message
git commit -m "Update JSON for dashboard"
```

#### 4. Push Your Changes

Next, push your changes to your forked repository (replace `<branch_name>` with the actual branch name you are working on):

```bash
git push origin <branch_name>
```

#### 5. Create a Pull Request (PR)

Finally, create a pull request (PR) to propose merging your changes into the main project repository:

1. Go to the original project repository on GitHub.
2. Click on the "Pull Requests" tab.
3. Click **New Pull Request**.
4. Choose the branch with your changes and submit the PR.

---

### Troubleshooting

Here are a few common issues and their solutions:

1. **Docker Not Starting Properly**:

   - Make sure Docker is installed correctly.
   - Verify that no other services are using port `8080` on your machine (you can modify the port in `docker-compose.yml` if necessary).

2. **Containers Not Running**:

   - Run `docker ps` to ensure the containers are running.
   - If containers are not running, use `docker logs <container_id>` to check for errors.

3. **Access Issues**:
   - Clear your browser cache or try accessing the dashboard in an incognito window.
