import {
  TextField,
  BlockStack,
  Select,
  Button,
  Thumbnail,
  Icon,
  InlineStack,
  FormLayout,
} from "@shopify/polaris";
import { Fragment } from "react";
import { useFieldArray, Controller, useFormContext } from "@gadgetinc/react";
import { PlusCircleIcon, XCircleIcon, ImageIcon } from "@shopify/polaris-icons";

const AnswerImage = ({ name, answerIndex, productImages }) => {
  const { watch } = useFormContext();

  const productSuggestionWatch = watch(
    `${name}.${answerIndex}.recommendedProduct.productSuggestion.id`
  );

  return productSuggestionWatch ? (
    <BlockStack inlineAlign="center">
      {productImages?.[productSuggestionWatch] ? (
        <Thumbnail
          size="large"
          alt={name}
          source={productImages?.[productSuggestionWatch]}
        />
      ) : (
        <Thumbnail size="large" alt={name} source={ImageIcon} />
      )}
    </BlockStack>
  ) : undefined;
};

export default ({ name, questionIndex, products }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const {
    fields: answers,
    append: addAnswer,
    remove: removeAnswer,
  } = useFieldArray({
    control,
    name,
  });

  const productsOptions = products?.map((p, i) => ({
    label: p.title ?? "",
    value: p.id,
    key: String(i),
  }));

  const productsImageMap = products?.reduce((acc, p) => {
    acc[p.id] = p.images.edges[0]?.node?.source ?? "";

    return acc;
  }, {});

  return (
    <BlockStack>
      {answers.map((_answer, i) => (
        <Fragment key={_answer.id}>
          <InlineStack blockAlign="center" gap="500">
            <FormLayout.Group>
              <Controller
                control={control}
                name={`${name}.${i}.text`}
                rules={{ required: "Required" }}
                render={({ field: { ref, ...fieldProps } }) => (
                  <TextField
                    requiredIndicator
                    label={`Answer ${i + 1}`}
                    autoComplete="off"
                    {...fieldProps}
                    error={
                      errors.quiz?.questions?.[questionIndex]?.answers?.[i]
                        ?.text?.message
                    }
                  />
                )}
              />
              <Controller
                control={control}
                name={`${name}.${i}.recommendedProduct.productSuggestion.id`}
                rules={{ required: "Required" }}
                render={({ field: { ref, ...fieldProps } }) => (
                  <Select
                    label="Recommended product"
                    placeholder="-"
                    options={productsOptions}
                    requiredIndicator
                    error={
                      errors.quiz?.questions?.[questionIndex]?.answers?.[i]
                        ?.recommendedProduct?.productSuggestion?.id?.message
                    }
                    {...fieldProps}
                  />
                )}
              />
            </FormLayout.Group>
            <AnswerImage
              answerIndex={i}
              productImages={productsImageMap}
              {...{ name }}
            />
            <Button
              icon={<Icon source={XCircleIcon} />}
              variant="monochromePlain"
              disabled={answers.length <= 1}
              onClick={() => removeAnswer(i)}
            />
          </InlineStack>
          <br />
        </Fragment>
      ))}
      <BlockStack inlineAlign="start">
        <Button
          variant="monochromePlain"
          icon={<Icon source={PlusCircleIcon} />}
          onClick={() => addAnswer({ text: "" })}
        >
          Add answer
        </Button>
      </BlockStack>
    </BlockStack>
  );
};
