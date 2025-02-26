FROM steamcmd/steamcmd:ubuntu-22
RUN apt-get update && apt-get install -y wget ca-certificates 
COPY steam_deploy.sh /root/steam_deploy.sh
ENTRYPOINT ["/root/steam_deploy.sh"]
