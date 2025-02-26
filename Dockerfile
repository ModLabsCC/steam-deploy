FROM steamcmd/steamcmd:ubuntu-22
RUN apt-get install -y curl ca-certificates 
COPY steam_deploy.sh /root/steam_deploy.sh
ENTRYPOINT ["/root/steam_deploy.sh"]
