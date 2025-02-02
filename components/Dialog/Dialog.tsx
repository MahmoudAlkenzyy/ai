import { Button, Dialog, Flex, Text } from "@radix-ui/themes";
import React, { Dispatch, SetStateAction } from "react";
import RatingBox from "../RatingBox/RatingBox";

interface MyDialogProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const MyDialog: React.FC<MyDialogProps> = ({ isOpen, setOpen }) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      {/* <Dialog.Trigger>
        <Button>Edit profile</Button>
      </Dialog.Trigger> */}
      {isOpen && (
        <Dialog.Content size={"4"} dir="rtl" maxWidth="650px" maxHeight="400">
          <Dialog.Title>
            <p className="!text-2xl">تقيم المكالمة</p>
          </Dialog.Title>
          {/* <Dialog.Description size="2" mb="4">
            Make changes to your profile.
          </Dialog.Description> */}

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="4" mb="2" weight="bold">
                تقيم الوكيل
              </Text>
              <RatingBox rating={3} />
            </label>
            <label>
              <Text as="div" size="4" mb="2" weight="bold">
                تقيم الخدمة
              </Text>
              <RatingBox rating={4} />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              className="!w-24"
              variant="soft"
              color="gray"
              onClick={() => setOpen(false)}
            >
              Ok
            </Button>
          </Flex>
        </Dialog.Content>
      )}
    </Dialog.Root>
  );
};

export default MyDialog;
