import { Plugin } from "aliucord/entities";
import { getByProps, MessageActions } from 'aliucord/metro';
import { before } from "aliucord/utils/patcher";

export default class AtSomeone extends Plugin {
    public async start() {
        const { getChannel } = getByProps("getChannel");
        const { getMemberIds } = getByProps("getMemberIds");

        before(MessageActions, "sendMessage", (_, [channelId, message]) => {
            if (message.content.includes("@someone")) {
                const channel = getChannel(channelId)
                const members = getMemberIds(channel.guildId)
                const member = members[Math.floor(Math.random() * members.length)]
                message.content.replace("@someone", `<@${member}>`)
            }
        })
    }
}