# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.177.0/containers/rust/.devcontainer/base.Dockerfile

FROM mcr.microsoft.com/vscode/devcontainers/rust:0-1

ARG USERNAME=${USERNAME:-"vscode"}
ARG USER_UID=${USER_UID:-"2000"}
ARG USER_GID=${USER_UID}

ARG INSTALL_ZSH="true"
ARG ENABLE_NONROOT_DOCKER="true"
# * Upgrade OS packages to their latest versions.
ARG UPGRADE_PACKAGES="false"
# * Use the OSS Moby CLI instead of the licensed Docker CLI.
ARG USE_MOBY="true"

ARG COMMON_DEBIAN_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library/common-debian.sh
ARG DOCKER_DEBIAN_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library/docker-debian.sh

ARG WORKING_DIR=/workspaces/try-to-tauri
WORKDIR ${WORKING_DIR}

RUN apt-get update \
  # * Install Tauri Dependencies.
  && apt-get install -y --no-install-recommends \
  build-essential \
  curl \
  wget \
  squashfs-tools \
  libssl-dev \
  libgtk-3-dev \
  libappindicator3-dev \
  libwebkit2gtk-4.0-dev \
  libgtksourceview-3.0-dev \
  # * Initialize Debian.
  && curl ${COMMON_DEBIAN_URL} -sSf | bash -s "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
  && chown -R ${USER_UID}:${USER_GID} ${WORKING_DIR} \
  # * Use Docker script from script library to set things up.
  && curl ${DOCKER_DEBIAN_URL} -sSf | bash -s "${ENABLE_NONROOT_DOCKER}" "/var/run/docker-host.sock" "/var/run/docker.sock" "${USERNAME}" "${USE_MOBY}" \
  # * Clean up.
  && apt-get autoremove -y \
  && apt-get clean -y \
  && rm -rf /var/lib/apt/lists/*

USER ${USERNAME}

ARG VOLTA_HOME=/home/${USERNAME}/.volta
ENV PATH=${PATH}:${VOLTA_HOME}/bin

# * Create the node_modules folder.
RUN mkdir -p ${WORKING_DIR}/node_modules \
  # * Avoiding extension reinstalls on container rebuild.
  && mkdir -p /home/${USERNAME}/.vscode-server/extensions \
  # * Persist zsh history between runs.
  && SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/home/${USERNAME}/commandhistory/.zsh_history" \
  && mkdir -p /home/${USERNAME}/commandhistory \
  && touch /home/${USERNAME}/commandhistory/.zsh_history \
  && echo ${SNIPPET} >> "/home/${USERNAME}/.zshrc" \
  # * Install Volta.
  && curl https://get.volta.sh | bash \
  # * Install Node.js.
  && volta install node@lts \
  # * Install Yarn.
  && volta install yarn@latest \
  # * Define a variable for Windows Subsystem for Linux 2 (WSL2).
  && DISPLAY_SNIPPET="export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}'):0" \
  && echo ${DISPLAY_SNIPPET} >> "/home/${USERNAME}/.zshrc"

ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]

CMD [ "sleep", "infinity" ]